const getByteByChar = (char: string) => Math.floor(parseInt(char, 36) * 7)

export const getRGBByName = ({
  name,
  lastName,
}: {
  name?: string
  lastName?: string
}) => {
  const DEFAULTS = { r: "k", g: "l", b: "m" }
  const r = getByteByChar(name?.[0] || DEFAULTS.r)
  const g = getByteByChar(lastName?.[0] || DEFAULTS.g)
  const b = getByteByChar(name?.[1] || DEFAULTS.b)
  return `rgb(${r},${g},${b})`
}

