import React, {useState} from 'react';
import './typingIndicator.css';
import './messageComponent.css';
import store from "@/app/_redux/store";
import Image from "next/image";

interface MessageComponentProps {
    text: string;
    isUser: boolean;
    index: number;
    isImage: boolean;
}

interface ZoomedImageProps {
    src: string;
    onClose: () => void;
}


const MessageComponent: React.FC<MessageComponentProps> = ({text, isUser, index, isImage}) => {
    const [isZoomed, setIsZoomed] = useState(false);

    const handleImageClick = () => {
        setIsZoomed(true);
    };
    const getMessageStyle = () => {
        return isUser ? 'sender' : 'recipient';
    };

    const getMarginTop = () => {
        const messages = store.getState().chatState.messages;
        const userChanged = messages[index]?.isUser !== messages[index - 1]?.isUser;
        return userChanged ? 'user-changed' : '';
    }

    return (
        <>
            {isImage ? (
                <div className={`${getMessageStyle()} message-bubble ${getMarginTop()}`} onClick={handleImageClick}>
                    <img src={`/${text}.png`} className="w-full rounded" alt={`Tarot card`} />
                </div>
            ) : (
                <div className={`${getMessageStyle()} message-bubble ${getMarginTop()}`}>{text}</div>
            )}
            {isZoomed && <ZoomedImage src={`/${text}.png`} onClose={() => setIsZoomed(false)} />}
        </>
    );

}
const TypingIndicator = () => (<div className="typing-indicator">
    {/* Some animation or text indicating typing */}
    <div className="px-6 py-2">
        <div className="dot-flashing"></div>
    </div>
    <style></style>
</div>);


const ZoomedImage: React.FC<ZoomedImageProps> = ({src, onClose}) => {
    return (<div className="zoomed-image-overlay" onClick={onClose}>
            <img src={src} className="zoomed-image" alt="Zoomed"/>
            <a href={src} download className="download-button">Download</a>
        </div>);
};


export default MessageComponent;
export {TypingIndicator};