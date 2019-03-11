console.log(document.querySelectorAll('[data-tid]'));
import './index.less';
for (var element of document.querySelectorAll('[data-tid]')) {
    element.classList.add('with-tid-wrapper');
    var node = document.createElement('div');
    node.classList.add('tid-wrapper');
    node.innerHTML = '<div><div>' + element.getAttribute('data-tid') + '</div></div>';
    element.appendChild(node);
}
