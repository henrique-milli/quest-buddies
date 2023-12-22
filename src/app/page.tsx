"use client";
import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {useSearchParams} from 'next/navigation';
import {addMessage, updateCurrentUserId} from './_redux/slices';
import MessageComponent, {TypingIndicator} from './_components/message';
import Image from "next/image";
import {startChat} from "@/app/_utils/bot";
import {ChatState} from "@/app/_redux/interfaces";
import ProgressBar from "@/app/_components/progressBar";

const Home = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const chatState = useSelector((state: { chatState: ChatState }) => state.chatState);
    const userId = useSearchParams().get('userId');

    useEffect(() => {
        if (userId) {
            dispatch(updateCurrentUserId(userId));
        }
        startChat().then(() => {});
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (input === '') return;

        if (chatState.sendRealMessages) {
            window.open(`https://wa.me/393893490043?text=${input}`, "_blank");
        } else {
            dispatch(addMessage({text: input, isUser: true, isImage: false}));
        }

        setInput('');
    };

    return (<div id={"app-container"} className="flex justify-center items-center h-screen bg-gray-100">

        <div id={"chat-header"} className="bg-dark-teal border-b p-1 inline-flex w-full justify-start items-center">
            <img src={"/0.png"} className={"rounded-full p-2 mr-2 w-1/6"} alt={"Henrique Milli's Avatar"}/>
            <h1 className="text-lg font-semibold h-fit text-slate-100">Henrique Milli (bot)</h1>
        </div>

        <div id={"chat-container"} className="p-7 text-slate-700 text-base chat-container w-full">
            {chatState.messages.map((c, i) => (<MessageComponent key={i} text={c.text} isUser={c.isUser} index={i} isImage={c.isImage}/>))}
            {chatState.botIsTyping && <TypingIndicator/>}
        </div>

        <div id={"chat-footer"} className={"w-full"}>
            <ProgressBar counter={chatState.counter}/>

            <form
                  className="w-full p-4 inline-flex justify-between h-20 bg-light-gray"
                  onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    className="w-3/4 p-5 border rounded-full"
                    placeholder={chatState.sendRealMessages ? "Scrivimi un messaggio..." : "Rispondi qui..."}
                />
                <button
                    type="submit"
                    className="w-12 rounded-full bg-dark-teal p-2 text-white">&#x27A4;
                </button>
            </form>
        </div>
    </div>);
}

// Map Redux state to component props
const mapStoreToProps = (state: { chatState: ChatState }) => ({
    chatState: state.chatState
});

// Map Redux actions to component props
const mapDispatchToProps = {
    addMessage, updateCurrentUserId
};

export default connect(mapStoreToProps, mapDispatchToProps)(Home);