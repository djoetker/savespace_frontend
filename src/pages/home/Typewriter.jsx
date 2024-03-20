import { useTypewriter, Cursor } from 'react-simple-typewriter';
import './TypewriterAnimation.css';

const Typewriter = () => {
    const [typeEffect] = useTypewriter({
        words: ["----------", "SAVE SPACE"],
        loop: {},
        typeSpeed: 120,
        deleteSpeed: 120,
    })



    return <div className="typewriter">
        <span className='typeEffect'>{typeEffect}</span>
        <Cursor />
    </div>;
};

export default Typewriter;