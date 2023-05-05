export const tokenizeFunctions = (functions) => {
  return functions.map((f) => {
    return {
      name: f[0],
      criteria: f[1].toString(),
    };
  });
};

export const tokenizeNodes = (nodes) => {
  return nodes.map((n) => {
    const type = n.isMajor ? "Major" : "Minor";
    const func = n.available.toString();
    return {
      name: `${type} Item - ${n.name}`,
      criteria: func,
    };
  });
};
