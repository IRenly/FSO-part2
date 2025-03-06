
const Header = ({ course }) => <h2>{course}</h2>;

const Content = ({ parts }) => (
    <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
);

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
);

const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
        return <p><strong>Total of {totalExercises} excercises</strong></p>;
};

const Course = ({ courses }) => (
<div>
    <h1>Web development curriculum</h1>
    {courses.map(course => (
    <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
    ))}
</div>
);

export default Course