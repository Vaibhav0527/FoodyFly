$content = Get-Content src\components\DeliveryboyDashboard.jsx -Raw
$content = $content -replace '      } catch \(error\) \{?
        console.log\(error\)?
      \}', "      } catch (error) {
        console.log(error)
        setMessage(error.response?.data?.message || "Invalid or Expired OTP")
        setLoading(false)
      }"
Set-Content src\components\DeliveryboyDashboard.jsx -Value $content
