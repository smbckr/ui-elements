const btn = document.querySelector('.btn');
const ripple = document.querySelector('.btn--ripple');
let rippleAnimation = 0;

const handleTransitionEnd = evt => {
  // transitionend event has three main main properties:
  //   propertyName, pseudoElement, elapsedTime
  //
  // 'transitionend' event fires for each property being transitioned (opacity, transform)
  // my last property being animated is 'opacity', clear animations
  if (evt.propertyName === 'opacity') {
    cancelAnimationFrame(rippleAnimation);
    rippleAnimation = 0;
    ripple.classList.remove('btn--ripple__animate');
    ripple.classList.remove('btn--ripple__fade');
    ripple.style.transform = 'scale(1)';
  }
}

const handleBtnClick = evt => {
  let btnDimensions = btn.getBoundingClientRect();
  let {clientX, clientY} = evt;
  // es5 alternative
  // var clientX = evt.clientX
  // var clientY = evt.clientY

  let relUserClickX = clientX - btnDimensions.left;
  let relUserClickY = clientY - btnDimensions.top;

  // Grab the max dimension and multiply by >2x to account for radius of ripple
  let scale = Math.max(btnDimensions.width, btnDimensions.height) * 2.5 / 2;

  // assign location of ripple to user's mouse click
  ripple.style.transform = `translate(${relUserClickX}px, ${relUserClickY}px)`;
  // es5 alternative
  // ripple.style.transform = 'translate(' + relPosX + 'px, ' + relPosY + 'px)';

  // rAF to make sure the above styles have been applied and we have a new frame
  rippleAnimation = requestAnimationFrame(_ => {
    // turn on animations
    ripple.classList.add('btn--ripple__animate');
    // expanding the ripple
    ripple.style.transform += ` scale(${scale})`;
    // fade out
    ripple.classList.add('btn--ripple__fade');
  });
}

btn.addEventListener('mousedown', handleBtnClick, false);
btn.addEventListener('transitionend', handleTransitionEnd, false);
