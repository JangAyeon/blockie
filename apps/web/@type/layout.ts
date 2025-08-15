export type ChildrenProps = {
  children: React.ReactNode;
};

export type LocaleParams = {
  params: Promise<{ locale: string }>;
};

export type LayoutProps = ChildrenProps;
export type LocaleLayoutProps = ChildrenProps & LocaleParams;
