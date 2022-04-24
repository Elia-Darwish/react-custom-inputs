import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'

import styles from 'styles/home.module.css'
import { Checkbox } from 'components/Checkbox'
import { Input } from 'components/Input'
import { AtIcon } from 'components/icons'

const Home: NextPage = () => {
  const [checked, setChecked] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div>
      <Head>
        <title>Heyflow Challenge</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.stack}>
          <label className={styles['form-control']}>
            <Checkbox name="checkbox-sm" size="sm" />
            <span>I agree to keep improving this awesome checkbox</span>
          </label>

          <label className={styles['form-control']}>
            <Checkbox name="checkbox-md" checked={checked} onCheckedChange={setChecked} />
            <span>I agree to keep improving this awesome checkbox</span>
          </label>

          <label className={styles['form-control']}>
            <Checkbox name="checkbox-lg-primary" variant="primary" size="lg" defaultChecked />
            <span>I agree to keep improving this awesome checkbox</span>
          </label>

          <label className={styles['form-control']}>
            <Checkbox
              name="checkbox-custom"
              variant="primary"
              style={{
                '--size': '36px',
                '--radius': '999999px',
                '--bg-active': 'SteelBlue',
              }}
            />
            <span>I agree to make it even more flexible</span>
          </label>
        </div>

        <div className={styles.stack}>
          <Input placeholder="mail@example.com" name="email-xs" label="E-Mail" sizeVariant="xs" Icon={<AtIcon />} />
          <Input placeholder="mail@example.com" name="email-sm" label="E-Mail" sizeVariant="sm" Icon={<AtIcon />} />
          <Input
            placeholder="mail@example.com"
            name="email-md"
            label="E-Mail"
            sizeVariant="md"
            Icon={<AtIcon />}
            value={email}
            onValueChange={setEmail}
          />
          <Input placeholder="mail@example.com" name="email-lg" label="E-Mail" sizeVariant="lg" Icon={<AtIcon />} />
          <Input placeholder="mail@example.com" name="email-xl" label="E-Mail" sizeVariant="xl" Icon={<AtIcon />} />
          <Input placeholder="mail@example.com" name="email-no-icon" label="E-Mail" />
        </div>
      </main>
    </div>
  )
}

export default Home
