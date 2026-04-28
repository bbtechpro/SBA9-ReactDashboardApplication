import { useState } from 'react';

export const TaskForm = ({ initialData, onSave }) => {
    const [task, setTask] = useState(initialData || { title: '', description: '' });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!task.name.trim()) newErrors.name = "Name is required.";
        if (task.description.length < 10) newErrors.description = "Description must be at least 10 chars.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            onSave(task);
            setErrors({}); // Clear errors on success
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={task.name}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <p role="alert" style={{ color: 'red' }}>{errors.name}</p>}

            <button type="submit">{initialData ? 'Update Task' : 'Add Task'}</button>
        </form>
    );
};
