type Props = {
  title: string | number;
  message?: string;
};

const alertStyle =
  "px-8 py-4 absolute top-8 left-1/2 transform -translate-x-1/2 rounded bg-opacity-30 flex items-center justify-center shadow-md";

export const SuccessModal = ({ title, message }: Props) => {
  return (
    <aside
      role="alert"
      className={`${alertStyle} bg-blue-500 transition translate-y-2 `}
    >
      <h3 className="">{title}&nbsp;</h3>
      <p>{message}</p>
    </aside>
  );
};

export const FailureModal = ({ title, message }: Props) => {
  return (
    <aside role="alert" className={`${alertStyle} bg-red-500`}>
      <h3 className="">{title}&nbsp;</h3>
      <p>{message}</p>
    </aside>
  );
};
