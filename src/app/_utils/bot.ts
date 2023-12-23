import {questions, tutorial, users} from './db';
import {addMessage, updateBotIsTyping, updateCounter, updateSendRealMessages} from '../_redux/slices';
import store from '../_redux/store';
import {ChatMessage} from "@/app/_redux/interfaces";

interface Question {
    question: string;
    a: string;
    b: string;
    c: string;
    answer: string;
}

export const startChat = async () => {

    const userId = store.getState().chatState.currentUserId;
    // User id 0 is the default and initial state, it will allways be present
    const user = users.find(user => user.id === userId) || users.find(user => user.id === "0");
    const firstName = user!.firstName;

    const messagesArr = [{
        text: `Ciao ${firstName}, ho un regalo per te!`, isUser: false, isImage: false
    }, {
        text: `Prima però una piccola sfida...`, isUser: false, isImage: false
    }, {
        text: `Rispondi correttamente a 3 domande consecutive per vincere!`, isUser: false, isImage: false
    }];

    await delayedTyping(messagesArr);

    await askQuestion(tutorial, true);

    // Make a copy of the questions array to avoid asking the same question twice
    let qs = [...questions];
    while (store.getState().chatState.counter < 3) {
        // Pick a random question
        const randomIndex = Math.floor(Math.random() * qs.length);
        // Ask the question
        const question = questions[randomIndex];
        await askQuestion(question);
        // Remove the question from the array
        qs.splice(randomIndex, 1);
    }

    await deliverReward(userId);
}

const askQuestion = async (q: Question, isTutorial = false) => {
    const messagesArr = [{
        text: `${q.question}\na. ${q.a}\nb. ${q.b}\nc. ${q.c}`, isUser: false, isImage: false
    }];
    if (isTutorial) {
        messagesArr.push({
            text: `Rispondi con a, b o c`, isUser: false, isImage: false
        });
    }

    await delayedTyping(messagesArr);

    // Wait for the user to answer
    const userAnswer = await waitForUserReply();
    // if answer is correct add 1 to counter
    if (userAnswer.toLowerCase() === q.answer) {
        await delayedTyping([{text: 'Esatto!', isUser: false, isImage: false}])
        store.dispatch(updateCounter(store.getState().chatState.counter + 1));
    } else {
        await delayedTyping([{text: 'Sbagliato!', isUser: false, isImage: false}])
        store.dispatch(updateCounter(0));
    }
}

const deliverReward = async (userId: string) => {
    const messagesArr = [{
        text: "Ecco una carta del tarot ispirata a te!",
        isUser: false,
        isImage: false
    }, {
        text: userId, isUser: false, isImage: true
    }, {
        text: "Se scrivi ora nel box qui sotto, potrai contattarmi con whatsapp (quello vero)!",
        isUser: false,
        isImage: false
    }];

    await delayedTyping(messagesArr);

    store.dispatch(updateSendRealMessages(true));
}

const delayedTyping = async (messages: ChatMessage[]) => {
    const delay = 1000;
    for (const m of messages) {
        //immediately dispatch bot is typing
        store.dispatch(updateBotIsTyping(true));
        // wait delay then dispatch message
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                store.dispatch(addMessage({text: m.text, isUser: false, isImage: m.isImage}));
                resolve();
            }, delay);
        });
        // scroll to bottom
        scrollToBottom();
        // dispatch bot is not typing
        store.dispatch(updateBotIsTyping(false));
    }

}
const waitForUserReply = (): Promise<string> => {
    return new Promise((resolve) => {
        const unsubscribe = store.subscribe(() => {
            const state = store.getState();
            const lastMessage = state.chatState.messages[state.chatState.messages.length - 1];
            if (lastMessage && lastMessage.isUser) {
                unsubscribe();
                resolve(lastMessage.text);
            }
        });
    });
};

const scrollToBottom = () => {
    const chatContainer = document.querySelector('#chat-container');
    if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
};