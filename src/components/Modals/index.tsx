export const SuccessModal = () => {
  return (
    <aside
      role="alert"
      className="absolute top-10 left-1/2 transform -translate-x-1/2 h-24 w-1/4 bg-blue-500 rounded bg-opacity-30 flex items-center justify-center"
    >
      <h3 className="">Success</h3>
    </aside>
  );
};

export const FailureModal = () => {
  return (
    <aside
      role="alert"
      className="absolute left-1/2 transform -translate-x-1/2  h-1/4 w-1/2 bg-red-500 rounded"
    >
      Failure
    </aside>
  );
};
