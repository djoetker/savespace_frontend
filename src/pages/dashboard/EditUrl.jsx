import CopyToClipboard from "react-copy-to-clipboard";

function EditUrl({ urlId, copyText, toggleModal, setCopied, copied }) {

    const handleCopy = () => {
        setCopied(true);
    
        setTimeout(() => {
            setCopied(false);
        }, 5000);    
    };

    return (
        <>
            <button onClick={toggleModal} id={urlId}>X</button>
            <CopyToClipboard text={copyText}>
                <button onClick={handleCopy}>CP</button>
            </CopyToClipboard>
        </>
    );
};

export default EditUrl;