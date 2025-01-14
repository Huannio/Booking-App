import { useEffect } from "react";
import axios from "~/utils/axiox.config";

function Home() {
    useEffect(() => {
        const fetchHelloWord = async () => {
            const response = await axios.get(`/api/hello`);
            console.log(response);
        }
        fetchHelloWord();
    })
    return <h2>1</h2>;
}

export default Home;