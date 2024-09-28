import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Share2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RoutePaths } from '@/router/Routes.types.ts';
import { Button } from '@/components/ui/button.tsx';

export default function AboutUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <Link to={RoutePaths.MAIN_PAGE} className="text-2xl font-bold text-blue-600">
              NoteShare
            </Link>
          </motion.div>
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Sign Up
            </Button>
          </motion.div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.section className="text-center mb-16" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800" variants={itemVariants}>
            Share Knowledge, Grow Together
          </motion.h1>
          <motion.p className="text-xl text-gray-600 mb-8" variants={itemVariants}>
            Welcome to NoteShare - Your platform for collaborative learning and knowledge exchange
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              to={RoutePaths.LOGIN}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300"
            >
              Explore Notes <ArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </motion.section>

        <motion.section className="grid md:grid-cols-3 gap-8 mb-16" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div className="bg-white p-6 rounded-lg shadow-lg" variants={itemVariants}>
            <BookOpen className="text-blue-500 w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Quality Notes</h2>
            <p className="text-gray-600">Explore a vast library of user-generated notes on various subjects.</p>
          </motion.div>
          <motion.div className="bg-white p-6 rounded-lg shadow-lg" variants={itemVariants}>
            <Share2 className="text-blue-500 w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Share Your Knowledge</h2>
            <p className="text-gray-600">Contribute your own notes and help others learn from your expertise.</p>
          </motion.div>
          <motion.div className="bg-white p-6 rounded-lg shadow-lg" variants={itemVariants}>
            <Users className="text-blue-500 w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Collaborate and Grow</h2>
            <p className="text-gray-600">Connect with like-minded learners and expand your understanding.</p>
          </motion.div>
        </motion.section>

        <motion.section className="text-center" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.h2 className="text-3xl font-bold mb-4 text-gray-800" variants={itemVariants}>
            Join Our Community Today
          </motion.h2>
          <motion.p className="text-xl text-gray-600 mb-8" variants={itemVariants}>
            Start sharing your knowledge and learning from others. It's free and easy to get started!
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              to={RoutePaths.REGISTER}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300"
            >
              Get Started Now <ArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </motion.section>
      </main>

      <footer className="bg-gray-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 NoteShare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
