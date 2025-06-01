export const cocOneController = async (req, res) => {
  try {
    res.status(200).json({ message: "CoC One data received successfully." });
  } catch (error) {
    console.error("Error in CoC One controller:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
