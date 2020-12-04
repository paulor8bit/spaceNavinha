function getStatusColor(hp, initialHp) {
  let statusColor = colors.GREEN;
  if (parseInt(initialHp/2) >= hp) {
    statusColor = colors.YELLOW;
    
    if (initialHp/4 >= hp) {
      statusColor = colors.RED;
    }
  }
  return statusColor;
}