  export const getDisplayName = (userName: string, sessionName: string) => {
    if (!userName) return "Unknown User";
    if (userName === sessionName) return "You";
    // Format userName for display
    const emailPart = userName.split("@")[0];
    return emailPart
      .split(".")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

export const getInitials = (userName: string) => {
  const namePart = userName.trim(); 
  const parts = namePart.split(" ").filter(p => p.length > 0);

  if (parts.length === 2) {
    // Two words → take first letter of each
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  // One word (or more than two words) → take first two letters
  return namePart.substring(0, 2).toUpperCase();
};

