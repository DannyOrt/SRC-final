import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {


    return (
        <Html lang="es">
            <Head >
              <link rel={"manifest"} href={"/manifest.json"}/>
            </Head>
            <body className={"bg-cyan-50 dark:bg-neutral-800 dark:text-neutral-300"}>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
