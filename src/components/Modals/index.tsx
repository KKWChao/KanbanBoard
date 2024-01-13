type Props = {
  title: string | number;
  code?: number;
  message?: string;
};

const alertStyle =
  "px-8 py-4 absolute top-8 left-1/2 transform -translate-x-1/2 rounded bg-opacity-30 flex items-center justify-center shadow-md";

export const SuccessModal = ({ title, code, message }: Props) => {
  return (
    <aside role="alert" className={`${alertStyle} bg-blue-500`}>
      <h3 className="font-semibold">{title}&nbsp;-&nbsp;</h3>
      <p>
        <span>{code}</span>: {message}
      </p>
    </aside>
  );
};

export const FailureModal = ({ title, code, message }: Props) => {
  return (
    <aside role="alert" className={`${alertStyle} bg-red-500`}>
      <h3 className="font-semibold">{title}&nbsp;-&nbsp;</h3>
      <p>
        <span>{code}</span>: {message}
      </p>
    </aside>
  );
};
