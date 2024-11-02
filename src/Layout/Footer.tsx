import { Section } from '../components/Section'

const Footer = () => {
  return (
    <footer className="bg-black">
      <Section as={'div'} className="h-[40rem] py-20">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl text-slate-500">Footer</h1>
        </div>
      </Section>
    </footer>
  )
}

export default Footer
