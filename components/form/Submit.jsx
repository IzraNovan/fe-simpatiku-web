import LoadingSpinner from "@components/loading/LoadingSpinner";

function Submit({
  loading,
  text,
  className,
  rounded = false,
  width,
  position = "justify-center",
  disabled,
  ...rest
}) {
  return (
    <div className={`flex ${position} mt-8 w-full`}>
      <button
        {...rest}
        className={`btn-submit ${rounded ? "rounded-full" : "rounded-md"} ${
          width ? `w-[${width}]` : `w-full`
        } ${className}`}
        type="submit"
        disabled={loading || disabled}
        style={
          disabled
            ? { cursor: "default" }
            : loading
            ? { cursor: "wait" }
            : { cursor: "pointer" }
        }>
        {loading ? <LoadingSpinner /> : text}
      </button>
    </div>
  );
}

export default Submit;
