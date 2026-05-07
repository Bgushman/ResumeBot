import ReactMarkdown from 'react-markdown'

function ChatMessage({ role, content }) {
  return (
    <div className={`chat-message ${role}`}>
      <div className="message-label">
        {role === 'assistant' ? 'ResumeBot' : 'You'}
      </div>
      <div className="message-bubble">
        {role === 'assistant' ? (
          <ReactMarkdown>{content}</ReactMarkdown>
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
  )
}

export default ChatMessage
