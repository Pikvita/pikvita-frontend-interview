import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white p-4 fixed bottom-0 left-0 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Pikvita Technologies Private Limited.</h3>
            <p>Koramangala, Bengaluru</p>
            <a href="mailto:support@pikvita.com" className="text-primary-500">support@pikvita.com</a>
          </div>
          <ul className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
            <li className="mx-2">
              <a target="_blank" className="hover:underline" href="/privacy-and-policy">Privacy Policy</a>
            </li>
            <span className="hidden md:inline-block mx-2">|</span>
            <li className="mx-2">
              <a target="_blank" className="hover:underline" href="/terms-and-conditions">Terms of use</a>
            </li>
            <span className="hidden md:inline-block mx-2">|</span>
            <li className="mx-2">
              <a target="_blank" className="hover:underline" href="/disclaimer">Disclaimer</a>
            </li>
            <span className="hidden md:inline-block mx-2">|</span>
            <li className="mx-2">
              <a target="_blank" className="hover:underline" href="/faq">FAQ</a>
            </li>
          </ul>
          <div className="flex space-x-4">
            <a target="_blank" href="https://www.instagram.com/pikvita">
              <img alt="instagram" loading="lazy" width="24" height="24" src='https://www.pikvita.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Finstagram.7cc5d7b8.png&w=32&q=75' />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61561627307501">
              <img alt="facebook" loading="lazy" width="24" height="24" src='https://www.pikvita.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffacebook.61c917e6.png&w=32&q=75' />
            </a>
            <a target="_blank" href="https://www.linkedin.com/company/pikvita">
              <img alt="linkedin" loading="lazy" width="24" height="24" src='https://www.pikvita.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flinkedin.9f1a6023.png&w=32&q=75' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer