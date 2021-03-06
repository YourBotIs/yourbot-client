import {EnvVariableSchema} from '../../../../../../modules/bots/schemas'
import {getSession} from 'next-auth/react'

export default async function bot(req, res) {
  const session = await getSession({req})
  const apiEndpoint = `${process.env.YOURBOT_API_BASE_URL}/bots/${req.query.botId}/environment_variables/`
  const apiHeaders = {
    accept: 'application/json',
    Authorization: process.env.YOURBOT_API_TOKEN,
  }

  if (session) {
    if (req.query.botId) {
      switch (req.method) {
        case 'GET': {
          const response = await fetch(apiEndpoint, {
            headers: apiHeaders,
          })

          if (response.ok) res.status(200).json((await response.json()).data)
          else {
            if (response.status === 404) res.status(404)
            else {
              console.error(
                'Error from API server',
                response.status,
                response.statusText,
              )
              res.status(500)
            }
          }

          break
        }
        case 'POST': {
          if (EnvVariableSchema.isValidSync(req.body)) {
            const response = await fetch(apiEndpoint, {
              body: JSON.stringify({
                environment_variable: JSON.parse(req.body),
              }),
              headers: {...apiHeaders, 'content-type': 'application/json'},
              method: 'POST',
            })

            if (response.ok) res.status(200).json((await response.json()).data)
            else {
              console.error(
                'Error from API server',
                response.status,
                response.statusText,
              )
              res.status(500)
            }
          } else {
            res.status(401)
          }
          break
        }
        default: {
          res.status(401)
          break
        }
      }
    } else {
      res.status(400)
    }
  } else {
    res.status(401)
  }
  res.end()
}
