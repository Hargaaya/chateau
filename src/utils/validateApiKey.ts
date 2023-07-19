function validateApiKey(key: string): boolean {
  const regex = /^sk-[a-zA-Z0-9]{32,}$/;
  return regex.test(key);
}

export default validateApiKey;
