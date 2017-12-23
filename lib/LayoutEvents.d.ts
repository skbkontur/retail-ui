type AddListener = (
  callback: () => void
) => {
  remove: () => void;
};

type Emit = () => void;

declare const LayoutEvents: {
  addListener: AddListener;
  emit: Emit;
};

export default LayoutEvents;
