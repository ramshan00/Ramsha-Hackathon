import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const AnimatedModal = ({ isModalOpen, closeModal }: { isModalOpen: boolean; closeModal: () => void }) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-green-400 via-teal-500 to-blue-600">
      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center"
      >
        {/* Lucide Check Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.2, rotate: 360 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="text-green-600" size={100} />
        </motion.div>

        {/* Modal Text */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-gray-800 mb-4"
        >
          Order Placed!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-8"
        >
          Your order has been successfully placed. Thank you for shopping with us!
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center space-x-4"
        >
          <button
            className="px-6 py-3 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition font-medium"
            onClick={closeModal}
          >
            Cancel
          </button>
          <Link href="/">
            <button className="px-6 py-3 text-white bg-teal-600 rounded-md hover:bg-teal-700 transition font-medium">
              Go to Home
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedModal;
