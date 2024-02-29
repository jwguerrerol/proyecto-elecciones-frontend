function Modal({ children, textButtonOpen, textButtonClose, textTitle, textParagraph }) {
  return (
    <div id="modal">
      <label htmlFor="my_modal_6" className="btn btn-accent">{ textButtonOpen }</label>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" id="modal-inside">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-gray-900">{ textTitle }</h3>
          <p className="py-4 text-gray-900">{ textParagraph }</p>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn btn-neutral">{ textButtonClose }</label>
            { children }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
