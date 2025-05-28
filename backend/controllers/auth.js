export default loginController = async (req, res) => {
  try {
    // login logic here
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
