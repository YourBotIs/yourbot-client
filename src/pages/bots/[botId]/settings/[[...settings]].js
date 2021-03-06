import {useRouter} from 'next/router'
import DisplayTitle from '../../../../common/components/DisplayTitle'
import BotDiscordSettingsButton from '../../../../modules/bots/components/BotDiscordSettingsButton'
import {getLayout} from '../../../../modules/bots/components/layouts/BotsLayout'
import DiscordSettings from '../../../../modules/bots/components/settings/DiscordSettings'
import EnvVariableSettings from '../../../../modules/bots/components/settings/EnvVariablesSettings'
import GeneralSettings from '../../../../modules/bots/components/settings/GeneralSettings'
import SettingsApp from '../../../../modules/bots/components/settings/SettingsApp'
import {SETTINGS_PAGES} from '../../../../modules/bots/constants'
import useBot from '../../../../modules/bots/hooks/useBot'

export default function Settings() {
  const router = useRouter()
  const {botId, settings} = router.query

  const {bot, isLoading, isError} = useBot(botId)

  let SettingsComponent = null
  switch (settings && settings[0]) {
    case SETTINGS_PAGES.DISCORD: {
      SettingsComponent = DiscordSettings
      break
    }
    case SETTINGS_PAGES.ENV_VARIABLES: {
      SettingsComponent = EnvVariableSettings
      break
    }
    // handles both general and index page routes
    default: {
      SettingsComponent = GeneralSettings
      break
    }
  }

  return bot ? (
    <>
      <DisplayTitle>
        <h1>Bot Settings</h1>
        <div className="ms-auto">
          <BotDiscordSettingsButton clientId={bot.application_id} />
        </div>
      </DisplayTitle>
      <section className="py-4">
        <SettingsApp>
          <SettingsComponent />
        </SettingsApp>
      </section>
    </>
  ) : null
}

export async function getServerSideProps(context) {
  if (
    context.params.settings?.length > 1 ||
    (context.params.settings &&
      Object.values(SETTINGS_PAGES).indexOf(context.params.settings[0]) < 0)
  )
    return {notFound: true}

  return {props: {}}
}

Settings.auth = true
Settings.getLayout = getLayout
