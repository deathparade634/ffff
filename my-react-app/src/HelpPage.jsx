import React from 'react';

const HelpPage = () => {
  return (
    <div className="flex justify-center p-8 bg-gray-50">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">Help Center</h1>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to the Help Center. Here you will find answers to frequently asked questions
          and guides to help you navigate the task management system.
        </p>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Frequently Asked Questions (FAQs)</h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>How do I create a new task?</strong>
              <p>Go to the Tasks page and click the Add Task button to create a new task.</p>
            </li>
            <li>
              <strong>How can I update a task?</strong>
              <p>Click on the task you want to update and use the edit form to make changes.</p>
            </li>
            <li>
              <strong>How do I delete a task?</strong>
              <p>Locate the task you want to delete and click the delete icon or button.</p>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Getting Support</h2>
          <p className="text-gray-700">
            If you need further assistance, please contact our support team at
            <a href="mailto:support@example.com" className="text-blue-500 hover:text-blue-600"> support@example.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
