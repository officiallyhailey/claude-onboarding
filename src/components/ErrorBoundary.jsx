import { Component } from "react";
import { Link } from "react-router-dom";

// Sits inside the header rather than around it, so a page that throws still
// leaves the reader a way to the other phases.

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { failed: null };
    }

    static getDerivedStateFromError(error) {
        return { failed: error };
    }

    componentDidUpdate(prev) {
        if (prev.resetKey !== this.props.resetKey && this.state.failed) {
            this.setState({ failed: null });
        }
    }

    render() {
        if (!this.state.failed) return this.props.children;

        return (
            <div className="hero">
                <div className="kicker">Something broke</div>
                <h1>This page did not render.</h1>
                <p>
                    The rest of the site is fine. The error was:{" "}
                    <code className="i">{String(this.state.failed.message || this.state.failed)}</code>
                </p>
                <p className="hint">
                    <Link to="/">Back to the four phases</Link>
                </p>
            </div>
        );
    }
}

export default ErrorBoundary;
