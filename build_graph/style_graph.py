#!/usr/bin/env python3
"""
Turbo build graph 스타일링 스크립트
기존 .dot 파일을 읽어 가독성이 좋은 그래프 스타일 형태로 변형
"""

import re
import sys
from pathlib import Path


def style_dot_file(input_file: str, output_file: str):
    """dot 파일을 읽어서 스타일을 추가하고 저장합니다."""
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 그래프 전체 스타일
    graph_style = '''
    rankdir=TB,
    splines=ortho,
    nodesep=1.0,
    ranksep=1.5,
    bgcolor="#f7f8f9",        # --color-gray-050
    fontname="Pretendard, Arial",
    fontsize=12,
    fontcolor="#191919",      # --color-gray-900
    compound=true,
    newrank=true
    '''



    # graph 블록 수정
    graph_pattern = r'(graph\s+\[)([^\]]*)(\])'
    match = re.search(graph_pattern, content, re.MULTILINE | re.DOTALL)
    if match:
        ## print(f"Match found: {match.group(0)}")
        existing_attrs = match.group(2)
        existing_attrs = re.sub(r'bb="[^"]*",?\s*', '', existing_attrs)
        existing_attrs = re.sub(r'\s+', ' ', existing_attrs).strip()
        new_graph_block = f'graph [{graph_style},\n\t\t{existing_attrs}\n\t]'
        content = re.sub(graph_pattern, new_graph_block, content, flags=re.MULTILINE | re.DOTALL)
    else:
        ## print(f"No match found")
        content = re.sub(
            r'(digraph\s*\{)',
            r'\1\n\tgraph [' + graph_style + '\n\t];',
            content
        )


    # 노드 스타일 적용
    lines = content.split('\n')
    content = '\n'.join(lines)


    # 기본 노드 스타일 지정
    content = re.sub(
        r'(digraph\s+\{[^\n]*)',
        r'\1\n\tnode [shape=box, style="filled", fontname="Pretendard, Arial", fontsize=11]\n',
        content
    )

    with open(output_file, 'w', encoding='utf-8') as f:
        print(f"Writing content to {output_file}")
        f.write(content)

    print(f"🎨 Tailwind 테마 기반 스타일이 적용된 그래프: {output_file}")


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("사용법: python3 style_graph.py <input.dot> <output.dot>")
        sys.exit(1)

    style_dot_file(sys.argv[1], sys.argv[2])
