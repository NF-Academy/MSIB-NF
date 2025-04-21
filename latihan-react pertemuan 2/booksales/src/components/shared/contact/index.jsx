export default function (){
    return (
        <>
        <section className="py-5 text-center" id="contact">
          <div className="container">
            <h2 className="mb-4">Contact Us</h2>
            <form className="w-50 mx-auto text-start">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nama</label>
                <input type="text" className="form-control" id="name" placeholder="Masukkan nama Anda" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="email@domain.com" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Pesan</label>
                <textarea className="form-control" id="message" rows="3" placeholder="Tulis pesan Anda di sini..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Kirim</button>
            </form>
          </div>
        </section>
        </>
    )
}