#!/bin/bash

mkdir -p build_graph/results

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
DOT_FILE="build_graph/results/temp_${TIMESTAMP}.dot"
PNG_FILE="build_graph/results/graph_${TIMESTAMP}.png"
STYLED_DOT_FILE="build_graph/results/styled_${TIMESTAMP}.dot"

npx turbo run build --graph="${DOT_FILE}"

if ! command -v dot &> /dev/null; then
  echo "Error: Graphviz가 설치되어 있지 않습니다."
  echo "다음 명령어로 설치하세요: brew install graphviz"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "${SCRIPT_DIR}/style_graph.py" ]; then
  python3 "${SCRIPT_DIR}/style_graph.py" "${DOT_FILE}" "${STYLED_DOT_FILE}"
elif [ -f "build_graph/style_graph.py" ]; then
  python3 "build_graph/style_graph.py" "${DOT_FILE}" "${STYLED_DOT_FILE}"
else
  echo "경고: 스타일링 스크립트를 찾을 수 없습니다. 원본 그래프를 사용합니다."
fi

dot -Tpng "${STYLED_DOT_FILE}" -o "${PNG_FILE}" -Gdpi=150

if [ -f "${STYLED_DOT_FILE}" ]; then
  echo "Removing dot file: ${STYLED_DOT_FILE}, ${DOT_FILE}"
  rm "${DOT_FILE}"
  rm "${STYLED_DOT_FILE}"
fi

# 최근 3개 파일만 유지하고 나머지 삭제
RESULTS_DIR="build_graph/results"
if [ -d "${RESULTS_DIR}" ]; then
  # PNG 파일들을 수정 시간 기준으로 정렬 (최신순)
  cd "${RESULTS_DIR}" || exit
  # 최신 3개를 제외한 나머지 파일 삭제
  ls -t graph_*.png 2>/dev/null | tail -n +4 | xargs rm -f 2>/dev/null
  cd - > /dev/null || exit
fi

echo "그래프가 생성되었습니다: ${PNG_FILE}"
