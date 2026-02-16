function ErrorMessage({ message }) {
  return (
    <p className="my-3 px-3 py-2 rounded-lg bg-red-500/15 border border-red-500/35 text-red-700 dark:text-red-300 text-sm font-medium">
      {message}
    </p>
  );
}

export default ErrorMessage;
