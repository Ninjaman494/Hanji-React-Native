/* eslint-disable @typescript-eslint/no-explicit-any */

expect.extend({
  toContainText(received, text: string) {
    const pass = dfs(received, (node) => node === text);
    return {
      message: () =>
        `Expected ${text}, but contained ${received.props.children}`,
      pass: pass,
    };
  },
});

const dfs = (node: any, fn: (node: any) => boolean) => {
  let isMatching = fn(node);

  if (Array.isArray(node.children)) {
    node.children.forEach((child: any) => {
      const hasMatchingChild = dfs(child, fn);
      isMatching = isMatching || hasMatchingChild;
    });
  }

  return isMatching;
};
