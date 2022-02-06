class Uid {
  static token = (
    sections: number = 3,
    length: number = 4,
    divider: string = "-"
  ) =>
    Array(sections)
      .fill("")
      .map(() => Uid.generate(length))
      .join(divider);

  static generate = (length: number) =>
    Array(length)
      .fill("")
      .map(() => {
        const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");
}

export default Uid;
