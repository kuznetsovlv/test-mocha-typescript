type MenuList = {
    title: string;
    link?: string;
    items?: MenuList;
}[]
type MenuOpt = {
    element: HTMLElement,
    menuList: MenuList
}
let menuList: MenuList = [
    {
        title: 'Животные',
        items: [
            {
                title: 'Млекопитающие',
                items: [
                    { title: 'Коровы' },
                    { title: 'Ослы' },
                    { title: 'Собаки' },
                    { title: 'Тигры' }
                ]
            },
            {
                title: 'Другие',
                items: [
                    { title: 'Змеи' },
                    { title: 'Птицы' },
                    { title: 'Ящерицы' },
                ],
            }
        ]
    },
    {
        title: 'Рыбы',
        items: [
            {
                title: 'Аквариумные',
                items: [
                    { title: 'Гуппи' },
                    { title: 'Скалярии' }
                ]
            },
            {
                title: 'Форель',
                items: [
                    { title: 'Морская форель' }
                ]
            }
        ]
    }
];

class A {
    public a: number;
}

interface IMenuClass {
    getElem: () => HTMLElement;
    toogle: (id: string) => void;
    close: (id: string) => void;
    open: (id: string) => void;
}

abstract class MenuGenerator implements IMenuClass {
    public abstract getElem(): HTMLElement;
    public abstract toogle(id: string): void;
    public abstract close(id: string): void;
    public abstract open(id: string): void;
    protected abstract _clickHandler(this: HTMLElement, ev: MouseEvent): void;
    protected abstract _generateMenu(menuList: MenuList): string;
}

class Menu extends MenuGenerator {
    protected _element: HTMLElement;
    protected _menuList: MenuList;

    public constructor(
        opt: MenuOpt
    ) {
        super();
        this._element = opt.element;
        this._menuList = opt.menuList;
        this._element.innerHTML = this._generateMenu(this._menuList);
        this._element.addEventListener('click', this._clickHandler);

        const input: HTMLInputElement = document.getElementById('title') as HTMLInputElement;
        const toogleBtn: HTMLButtonElement = document.getElementById('toogle') as HTMLButtonElement;
        const openBtn: HTMLButtonElement = document.getElementById('open') as HTMLButtonElement;
        const closeBtn: HTMLButtonElement = document.getElementById('close') as HTMLButtonElement;

        toogleBtn.addEventListener('click', (event: MouseEvent): boolean => {
            const target: HTMLButtonElement = event.target as HTMLButtonElement;

            if (target !== toogleBtn) {
                return;
            }

            this.toogle(input.value);

            try {
              event.preventDefault();
              event.stopPropagation();
            } catch (e) {
              event.cancelBubble = true;
            }
            return false;
        }, false);

        openBtn.addEventListener('click', (event: MouseEvent): boolean => {
            const target: HTMLButtonElement = event.target as HTMLButtonElement;

            if (target !== openBtn) {
                return;
            }

            this.open(input.value);

            try {
              event.preventDefault();
              event.stopPropagation();
            } catch (e) {
              event.cancelBubble = true;
            }
            return false;
        }, false);

        closeBtn.addEventListener('click', (event: MouseEvent): boolean => {
            const target: HTMLButtonElement = event.target as HTMLButtonElement;

            if (target !== closeBtn) {
                return;
            }

            this.close(input.value);

            try {
              event.preventDefault();
              event.stopPropagation();
            } catch (e) {
              event.cancelBubble = true;
            }
            return false;
        }, false);
    }

    public getElem() {
        return this._element;
    }

    public toogle (id: string): void {
        const li: HTMLLIElement = document.getElementById(id.toLowerCase()) as HTMLLIElement;

        if (li) {
            li.classList.toggle('menu-open');
        }
    }

    public open(id: string): void {
        const li: HTMLLIElement = document.getElementById(id.toLowerCase()) as HTMLLIElement;

        if (li) {
            li.classList.add('menu-open');
        }
    }

    public close(id: string): void {
        const li: HTMLLIElement = document.getElementById(id.toLowerCase()) as HTMLLIElement;

        if (li) {
            li.classList.remove('menu-open');
        }
    }

    protected _clickHandler(this: HTMLElement, ev: MouseEvent): void {
        let el: HTMLAnchorElement = ev.target as HTMLAnchorElement;
        let classList = el.classList;
        if (!classList.contains('title')) {
            return;
        }
        let parentLi: HTMLLIElement = el.parentNode as HTMLLIElement;
        parentLi.classList.toggle('menu-open')
    }
    protected _generateMenu(menuList: MenuList): string {
        let content: string = `<ul>`;
        for (let a of menuList) {
            const { link, title } = a;
            content += `<li id="${title.toLowerCase()}"><a ${a.items ? 'class=title' : ''}
            ${a.link ? 'href=' + link : ''}>${title}</a>`
            if (!a.items) {
                content += `</li>`;
                continue;
            }
            content += `${this._generateMenu(a.items)}</li>`;
        }
        return `${content}</ul>`
    }
}

let element = document.querySelector('.menu') as HTMLElement;
let nav = new Menu({ element, menuList })