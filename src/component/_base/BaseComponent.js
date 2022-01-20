import {Component} from "react";

/**
 * RN Component 를 Wrapping
 * @extends {Component}
 */
export default class BaseComponent extends Component {
    /**
     * 생성자
     * @param props
     */
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
}
