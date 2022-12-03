import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useRouter } from 'next/router';
import {useEffect} from "react";

export default function Home() {
   let router = useRouter();
   useEffect(() => {
      router.push("/home");
   }, [])

   return (<div>

   </div>)
}
