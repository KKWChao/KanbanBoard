import { motion } from "framer-motion";

const SaveModal = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="absolute top-10 left-1/2 -translate-x-1/2 p-4 text-lg bg-rose-500 rounded"
    >
      Saved!
    </motion.div>
  );
};

export default SaveModal;
