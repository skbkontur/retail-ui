import { mount } from 'enzyme';
import React from 'react';

import Pager from '../Pager';
import PagerStyles from '../Pager.less';

function findLinkByNumber(wrapper, pageNumber) {
    return wrapper.findWhere(n => n.is(`.${PagerStyles.link}`) && n.text() === pageNumber.toString());
}

function buildEventObject(value) {
    return expect.objectContaining({
            target: expect.objectContaining({
                value: value
            })
        });
}

describe('Pager', () => {
    it('renders links', () => {
        const wrapper = mount(<Pager pagesCount={5} currentPage={1}/>);
        
        expect(wrapper.find(`.${PagerStyles.link}`)).toHaveLength(5);
    });

    it('hides elements behind ellipsis', () => {
        const wrapper = mount(<Pager pagesCount={30} currentPage={6}/>);
        const links = wrapper.find(`.${PagerStyles.link}`);
        
        expect(links.findWhere(n => n.text() === "1").exists()).toBe(true);
        expect(links.findWhere(n => n.text() === "2").exists()).toBe(false);
        expect(links.findWhere(n => n.text() === "4").exists()).toBe(true);
        expect(links.findWhere(n => n.text() === "6").exists()).toBe(true);
        expect(links.findWhere(n => n.text() === "8").exists()).toBe(true);
        expect(links.findWhere(n => n.text() === "29").exists()).toBe(false);
        expect(links.findWhere(n => n.text() === "30").exists()).toBe(true);

        expect(wrapper.find(`.${PagerStyles.ellipsis}`)).toHaveLength(2);
    });

    it('calls onPageChange correctly', () => {
        const newPage = 2;
        const onPageChange = jest.fn();
        const wrapper = mount(<Pager pagesCount={5} currentPage={1} onPageChange={onPageChange}/>);
        
        findLinkByNumber(wrapper, newPage).simulate('click');
        expect(onPageChange).toBeCalledWith(buildEventObject(newPage), newPage);
    });

    it('renders link with href', () => {
        const pageNumber = 3;
        var renderHref = (pageNumber) => `http://kontur.ru/page-${pageNumber}`;
        const wrapper = mount(<Pager pagesCount={5} currentPage={1} renderHref={renderHref}/>);

        expect(findLinkByNumber(wrapper, pageNumber).prop('href')).toBe(renderHref(pageNumber));
    });

    it('focuses correct link on focus and on left/right navigation', () => {
        const wrapper = mount(<Pager pagesCount={5} currentPage={2}/>);
        const input = wrapper.find(`.${PagerStyles.input}`);

        // 1 2 3 4 5 → 1 ② 3 4 5
        input.simulate('focus');
        expect(findLinkByNumber(wrapper, 2).is(`.${PagerStyles.linkFocused}`)).toBe(true);
        
        // 1 ② 3 4 5 → 1 2 ③ 4 5
        input.simulate('keydown', {key: 'ArrowRight'});
        expect(findLinkByNumber(wrapper, 3).is(`.${PagerStyles.linkFocused}`)).toBe(true);
        
        // 1 2 ③ 4 5 → 1 ② 3 4 5
        input.simulate('keydown', {key: 'ArrowLeft'});
        expect(findLinkByNumber(wrapper, 2).is(`.${PagerStyles.linkFocused}`)).toBe(true);
        
        // 1 ② 3 4 5 → ① 2 3 4 5
        input.simulate('keydown', {key: 'ArrowLeft'});
        expect(findLinkByNumber(wrapper, 1).is(`.${PagerStyles.linkFocused}`)).toBe(true);
        
        // ① 2 3 4 5 Дальше → 1 2 3 4 5 (Дальше)
        input.simulate('keydown', {key: 'ArrowLeft'});
        expect(wrapper.find(`.${PagerStyles.nextPageLink}`).is(`.${PagerStyles.nextPageLinkFocused}`)).toBe(true);
        
        // ① 2 3 4 5 (Дальше) → 1 2 3 4 ⑤ Дальше
        input.simulate('keydown', {key: 'ArrowLeft'});
        expect(findLinkByNumber(wrapper, 5).is(`.${PagerStyles.linkFocused}`)).toBe(true);
    });

    it('calls onPageChange correctly on Ctrl+left/right navigation', () => {
        const onPageChange = jest.fn();
        const wrapper = mount(<Pager pagesCount={5} currentPage={1} onPageChange={onPageChange}/>);
        const input = wrapper.find(`.${PagerStyles.input}`);

        //① 2 3 4 5
        input.simulate('focus');

        //Текущая страница в компоненте не меняется фактически по нажатию на Ctrl+→, т.к. он принимает её в качестве props
        input.simulate('keydown', {ctrlKey: true, key: 'ArrowRight'});
        expect(onPageChange).lastCalledWith(buildEventObject(2), 2);

        input.simulate('keydown', {ctrlKey: true, key: 'ArrowLeft'});
        expect(onPageChange).toHaveBeenCalledTimes(1);
    });
});