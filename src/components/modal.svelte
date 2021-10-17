<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const handleVisibility = () => {
    dispatch("close");
  };

  const handleOutsideClick = (event) => {
    if (event.target.className.includes("background")) {
      return handleVisibility();
    }
  };
</script>

<div
  class="background"
  on:click|stopPropagation={(event) => handleOutsideClick(event)}
/>

<div class="modal-wrapper">
  <div>
    <div class="modal-header">
      <div>
        <slot name="header" />
      </div>
      <button
        class="close-icon "
        on:click|stopPropagation={() => handleVisibility()}
      />
    </div>
    <div class="modal-body">
      <slot name="body" />
    </div>
  </div>
</div>

<style>
  .background {
    opacity: 0.8;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
    position: fixed;
    background: #0b0b0b;
    -webkit-transition: opacity 0.3s ease-out;
    -moz-transition: opacity 0.3s ease-out;
    -o-transition: opacity 0.3s ease-out;
    transition: opacity 0.3s ease-out;
  }

  .modal-wrapper {
    margin: 5vw auto;
    max-width: 100%;
    display: block;
    opacity: 1;
    width: calc(100% - 30vw);
    position: fixed;
    left: 0;
    right: 0;
    background-color: white;
    max-height: 86%;
    overflow-y: auto;
    border-radius: 2px 10px;
    padding: 0;
    will-change: top, opacity;
    top: 0;
    z-index: 2;
  }

  .modal-header {
    display: flex;
    max-width: inherit;
    justify-content: space-between;
    padding: 24px 20px 0px 20px;
  }

  .modal-body {
    padding: 0px 20px 20px 20px;
    background-color: white;
  }

  .close-icon {
    color: var(--cool-grey);
    position: relative;
    margin-top: 0;
    margin-left: 0;
    width: 14px;
    height: 14px;
    border: none;
    background: none;
    cursor: pointer;
  }

  .close-icon:before,
  .close-icon:after {
    content: "";
    position: absolute;
    top: 10px;
    width: 14px;
    height: 1px;
    left: -2px;
    background-color: currentColor;
  }
  .close-icon:before {
    transform: rotate(-45deg);
  }
  .close-icon:after {
    transform: rotate(45deg);
  }
</style>
