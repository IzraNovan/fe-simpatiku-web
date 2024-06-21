import React from "react";
import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";

function TextInput({ type, id, name, ...restProps }) {
	return <Input {...restProps} />;
}

TextInput.propTypes = {
	type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default TextInput;
