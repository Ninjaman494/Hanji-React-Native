expect.extend({
  toContainText(received, text) {
    const pass = received.props.children === text;
    return {
      message: () => `Element doesn't contain text: ${text}`,
      pass: pass,
    };
  },
});
