import { Section } from "../components/Section"

const Header = () => {
  return (
    <nav className="bg-slate-800 sticky w-full top-0 left-0 z-50">
      <Section as={'div'} className="h-[5rem] flex items-center">
        <h1 className="text-white text-xl font-semibold">Quiz</h1>
      </Section>
    </nav>
  )
}

export default Header
