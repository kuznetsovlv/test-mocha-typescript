const LEAD_CLASS: string = 'lead';
const SLIDER_CLASS: string = 'slider';
const TARGET_CLASS: string = 'slider-place';

const LEAD_HEIGT: number = 0;
const SLIDER_HEIGHT: number = 20;
const SLIDER_WIDTH: number = 0;

const PERIOD: number = 40;

function throttle(callback: (...rest: any[]) => any, ms: number): (...rest: any[]) => void {

  let timeout = null;
  let args: any[] = null;
  let context: any = null;

  return function (...rest: any[]): void {
    args = rest;
    context = this;

    if (!timeout) {
      timeout = setTimeout(() => {
        callback.apply(context, args);
        timeout = null;
        args = null;
        context = null;
      }, ms);
    }
  };
}

class Slider {
  private _target: HTMLElement;
  private _lead: HTMLElement;
  private _slider: HTMLElement;

  private _minLeft: number;
  private _maxRight: number;

  private _sliderDx: number;
  private _sliderWidth: number;

  public constructor(target: HTMLElement) {
    this._target = target;

    /*
     * Было желание передавать методам this, как это было сделано в меню на занятиях,
     * но, к сожалению, этим методам нужен текущий this экземпляра класса.
     */
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onMouseMove = throttle(this._onMouseMove, PERIOD).bind(this);

    this._initLead();
    this._initSlider();
  }

  private _getSliderWidth(): number {
    if (!this._slider) {
      return 0;
    }

    const { left, right, width } = this._slider.getBoundingClientRect();

    // На сколько я помню, в некоторых старых браузерах getBoundingClientRect() возвращает результат без width и height.
    return width || right - left;
  }

  private _initLead(): void {
    this._lead = document.createElement('div') as HTMLElement;
    this._lead.className = LEAD_CLASS;

    const style: CSSStyleDeclaration = this._lead.style as CSSStyleDeclaration;
    style.position = 'relative';
    style.height = `${LEAD_HEIGT}px`;
    style.width = '100%';

    if (this._slider) {
      this._lead.appendChild(this._slider);
    }

    this._target.appendChild(this._lead);

    const { left, right } = this._lead.getBoundingClientRect();

    this._minLeft = left;
    this._maxRight = right - this._getSliderWidth();
  }

  private _initSlider(): void {
    this._slider = document.createElement('div') as HTMLElement;
    this._slider.className = SLIDER_CLASS;

    const style: CSSStyleDeclaration = this._slider.style as CSSStyleDeclaration;
    style.position = 'absolute';
    style.height = `${SLIDER_HEIGHT}px;`;
    style.width = `${SLIDER_WIDTH}px`;
    style.left = '0';
    style.top = `${(LEAD_HEIGT - SLIDER_HEIGHT) / 2}px`;

    this._slider.addEventListener('mousedown', this._onMouseDown, false);

    if (this._lead) {
      this._lead.appendChild(this._slider);
      this._maxRight -= this._getSliderWidth();
    }
  }

  private _onMouseDown(event: MouseEvent): boolean {
    document.addEventListener('mousemove', this._onMouseMove, false);
    this._slider.removeEventListener('mousedown', this._onMouseDown, false);
    document.addEventListener('mouseup', this._onMouseUp, false);

    const { right } = this._slider.getBoundingClientRect();

    this._sliderDx = event.clientX - right;


    try {
      event.preventDefault();
      event.stopPropagation();
    } catch (e) {
      event.cancelBubble = true;
    }
    return false;
  }

  private _onMouseUp(event: MouseEvent): boolean {
    document.removeEventListener('mousemove', this._onMouseMove, false);
    document.removeEventListener('mouseup', this._onMouseUp, false);
    this._slider.addEventListener('mousedown', this._onMouseDown, false);

    try {
      event.preventDefault();
      event.stopPropagation();
    } catch (e) {
      event.cancelBubble = true;
    }
    return false;
  }

  private _onMouseMove(event: MouseEvent): boolean {
    let absX: number = event.clientX - this._sliderDx;

    if (absX < this._minLeft) {
      absX = this._minLeft;
    } else if (absX > this._maxRight) {
      absX = this._maxRight;
    }

    this._slider.style.left = `${absX - this._minLeft}px`;

    try {
      event.preventDefault();
      event.stopPropagation();
    } catch (e) {
      event.cancelBubble = true;
    }
    return false;
  }
}


window.onload = () => {
  new Slider(document.getElementById(TARGET_CLASS));
};
