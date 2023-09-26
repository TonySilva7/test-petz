function formatReal(value: number) {
  const withDecimals = value.toFixed(2);
  const formattedNumber = withDecimals.toString().replace('.', ',');
  return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export { formatReal };
