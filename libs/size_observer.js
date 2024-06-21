class SizeObserver {
  callback = (sizeCategory) => {};
  size = {
    number: -1,
    infix: 'none',
    width: -1,
  };
  listener = () => {
    this.calculateSize();
    this.callback({ ...this.size });
  };

  constructor() {
    document.defaultView.addEventListener('resize', this.listener);
  }

  setup(callback) {
    this.callback = callback;
    this.listener();
  }

  calculateSize() {
    const width = window.innerWidth;
    // 'breakpoints' reference
    // https://getbootstrap.com/docs/5.0/layout/breakpoints/
    if (width < 576) {
      this.setSize(0, 'xsm');
    } else if (width >= 1400) {
      this.setSize(5, 'xxl');
    } else if (width >= 1200) {
      this.setSize(4, 'xl');
    } else if (width >= 991) {
      this.setSize(3, 'lg');
    } else if (width >= 768) {
      this.setSize(2, 'md');
    } else if (width >= 576) {
      this.setSize(1, 'sm');
    }
    this.size.width = width;
  }

  setSize(number, infix) {
    this.size.number = number;
    this.size.infix = infix;
  }

  cleanup() {
    document.defaultView.removeEventListener('resize', this.listener);
  }
}

SizeObserver.initialSize = {
  number: -1,
  infix: 'none',
  width: -1,
};

export default SizeObserver;