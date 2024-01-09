export const SuccessModal = () => {
  return (
    <aside
      role="alert"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/4 w-1/2 bg-blue-500 rounded"
    >
      Success
    </aside>
  );
};

export const FailureModal = () => {
  return (
    <aside
      role="alert"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/4 w-1/2 bg-red-500 rounded"
    >
      Failure
    </aside>
  );
};
